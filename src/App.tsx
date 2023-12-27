import { useRecoilState } from "recoil";
import { hoursState, minutesState } from "./state/atorms";
import { FormEvent } from "react";

function App() {
  const [minute, setMinute] = useRecoilState(minutesState);
  const [hour, setHour] = useRecoilState(hoursState);

  const onChageMinites = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setMinute(+value);
  };

  const onChageHours = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setHour(+value);
  };

  return (
    <div>
      <input value={minute} onChange={onChageMinites} />
      <input value={hour} onChange={onChageHours} />
    </div>
  );
}

export default App;
