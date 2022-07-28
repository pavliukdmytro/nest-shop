import { IMessages } from '@components/def/DefMessage/IMessages';

const DefMessage = ({ messages, name }: IMessages) => {
  if (name in messages) {
    return (
      <div className="mb-3">
        <p className="text-success mb-1">{messages[name]}</p>
      </div>
    )
  }
  return null;
}

export default DefMessage;