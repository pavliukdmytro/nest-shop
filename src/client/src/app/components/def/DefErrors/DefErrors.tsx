import { IErrors } from '@components/def/DefErrors/IErrors';

const DefErrors = ({ name, errors }: IErrors) => {
  // console.log(props);
  if (name in errors) {
    return (
      <div className="mb-3">
        {
          // @ts-ignore
          Object.values(errors[ name ]).map((err: string) => {
            return (
              <p className="text-danger mb-1" key={ err }>{err}</p>
            )
          }) }
      </div>
    )
  }
  return null;
}

export default DefErrors;