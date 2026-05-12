import { useState, useEffect } from 'react';
import { DAYS } from './data/days';
import { loadState, saveState } from './lib/storage';
import { HomeScreen } from './components/screens/HomeScreen';
import { CarouselScreen } from './components/screens/CarouselScreen';
import { TimelineScreen } from './components/screens/TimelineScreen';
import { CountdownScreen } from './components/screens/CountdownScreen';
import { BrewRunningScreen } from './components/screens/BrewRunningScreen';
import { PostBrewScreen } from './components/screens/PostBrewScreen';
import { NonBrewScreen } from './components/screens/NonBrewScreen';

export default function App() {
  const [state, setState] = useState(loadState);
  const [activeDayNum, setActiveDayNum] = useState(null);
  const [subScreen, setSubScreen] = useState('carousel');
  const [brewElapsed, setBrewElapsed] = useState(0);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleSelectDay = (num) => {
    setActiveDayNum(num);
    setSubScreen('carousel');
  };

  const handleBackHome = () => {
    setActiveDayNum(null);
    setSubScreen('carousel');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const handleComplete = (dayNum, log) => {
    setState((prev) => ({
      ...prev,
      completed: { ...prev.completed, [dayNum]: true },
      logs: { ...prev.logs, [dayNum]: log },
    }));
    handleBackHome();
  };

  const handleRepeatLater = (dayNum, log) => {
    setState((prev) => ({
      ...prev,
      logs: { ...prev.logs, [dayNum]: { ...log, repeatRequested: true } },
    }));
    handleBackHome();
  };

  if (activeDayNum === null) {
    return <HomeScreen state={state} onDayClick={handleSelectDay} />;
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
    return <TimelineScreen day={day} onBack={() => setSubScreen('carousel')} onStart={() => setSubScreen('countdown')} />;
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
