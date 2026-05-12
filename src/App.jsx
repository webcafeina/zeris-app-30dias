import { useState, useEffect } from 'react';
import { DAYS } from './data/days';
import {
  loadState,
  saveState,
  getSelectedMethod,
  setSelectedMethod as persistMethod,
  clearSelectedMethod,
  getMethodState,
  setMethodState,
} from './lib/storage';
import { HomeScreen } from './components/screens/HomeScreen';
import { CarouselScreen } from './components/screens/CarouselScreen';
import { TimelineScreen } from './components/screens/TimelineScreen';
import { PrepScreen } from './components/screens/PrepScreen';
import { CountdownScreen } from './components/screens/CountdownScreen';
import { BrewRunningScreen } from './components/screens/BrewRunningScreen';
import { PostBrewScreen } from './components/screens/PostBrewScreen';
import { NonBrewScreen } from './components/screens/NonBrewScreen';
import { MethodScreen } from './components/screens/MethodScreen';

export default function App() {
  const [state, setState] = useState(loadState);
  const [method, setMethod] = useState(getSelectedMethod);
  const [activeDayNum, setActiveDayNum] = useState(null);
  const [subScreen, setSubScreen] = useState('carousel');
  const [brewElapsed, setBrewElapsed] = useState(0);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Selector de método: si no hay ninguno guardado, mostramos la pantalla inicial.
  if (!method) {
    return (
      <MethodScreen
        onSelect={(id) => {
          persistMethod(id);
          setMethod(id);
        }}
      />
    );
  }

  // Estado scoped al método activo. Cada método mantiene su propio progreso.
  const methodState = getMethodState(state, method);

  const handleSwitchMethod = (id) => {
    persistMethod(id);
    setMethod(id);
    setActiveDayNum(null);
    setSubScreen('carousel');
  };

  const handleResetMethod = () => {
    clearSelectedMethod();
    setMethod(null);
    setActiveDayNum(null);
    setSubScreen('carousel');
  };

  const handleSelectDay = (num) => {
    setActiveDayNum(num);
    setSubScreen('carousel');
  };

  const handleBackHome = () => {
    setActiveDayNum(null);
    setSubScreen('carousel');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const updateMethodState = (mutator) => {
    setState((prev) => {
      const current = getMethodState(prev, method);
      return setMethodState(prev, method, mutator(current));
    });
  };

  // Cada vez que el usuario termina (o re-hace) un ejercicio, APPENDEAMOS
  // un nuevo intento a logs[dayNum] en lugar de sobrescribir. Así el
  // usuario puede repetir el mismo día varias veces y conservar las notas
  // de cata de cada intento (para comparar evolución).
  const appendLog = (logsForDay, entry) => {
    const arr = Array.isArray(logsForDay) ? logsForDay : (logsForDay ? [logsForDay] : []);
    return [
      ...arr,
      {
        ...entry,
        attemptNumber: arr.length + 1,
        timestamp: entry?.timestamp || Date.now(),
      },
    ];
  };

  const handleComplete = (dayNum, log) => {
    updateMethodState((current) => ({
      ...current,
      completed: { ...current.completed, [dayNum]: true },
      logs: { ...current.logs, [dayNum]: appendLog(current.logs?.[dayNum], log) },
    }));
    handleBackHome();
  };

  const handleRepeatLater = (dayNum, log) => {
    updateMethodState((current) => ({
      ...current,
      logs: {
        ...current.logs,
        [dayNum]: appendLog(current.logs?.[dayNum], { ...log, repeatRequested: true }),
      },
    }));
    handleBackHome();
  };

  if (activeDayNum === null) {
    return (
      <HomeScreen
        state={methodState}
        method={method}
        onDayClick={handleSelectDay}
        onSwitchMethod={handleSwitchMethod}
        onResetMethod={handleResetMethod}
      />
    );
  }

  const day = DAYS.find((d) => d.num === activeDayNum);
  if (!day) return null;

  if (day.type !== 'brew') {
    return (
      <NonBrewScreen
        day={day}
        onBack={handleBackHome}
        onComplete={(log) => handleComplete(day.num, log)}
      />
    );
  }

  if (subScreen === 'carousel') {
    return <CarouselScreen day={day} onBack={handleBackHome} onContinue={() => setSubScreen('timeline')} />;
  }

  if (subScreen === 'timeline') {
    return <TimelineScreen day={day} onBack={() => setSubScreen('carousel')} onStart={() => setSubScreen('prep')} />;
  }

  if (subScreen === 'prep') {
    return <PrepScreen day={day} onBack={() => setSubScreen('timeline')} onContinue={() => setSubScreen('countdown')} />;
  }

  if (subScreen === 'countdown') {
    return <CountdownScreen onDone={() => setSubScreen('running')} />;
  }

  if (subScreen === 'running') {
    return (
      <BrewRunningScreen
        day={day}
        onFinish={(e) => {
          setBrewElapsed(e);
          setSubScreen('post');
        }}
      />
    );
  }

  if (subScreen === 'post') {
    return (
      <PostBrewScreen
        day={day}
        elapsed={brewElapsed}
        onComplete={(log) => handleComplete(day.num, log)}
        onRepeatLater={(log) => handleRepeatLater(day.num, log)}
        onRepeatNow={() => {
          setBrewElapsed(0);
          setSubScreen('timeline');
        }}
      />
    );
  }

  return null;
}
