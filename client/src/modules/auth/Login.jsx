import Form from "./components/Form";

const Login = () => {
  return (
    <>
      <div className="p-4">
        <div className="flex justify-center w-full">
          <div className="flex flex-col justify-center items-center sm:w-[450px] w-full bg-purple-200 py-10 px-5 rounded-lg shadow-xl">
            <h1 className="text-center text-3xl font-medium text-[#c002c0] mb-8">
              Login
            </h1>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
