import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FieldError,
  InputGroup,
  Spinner,
  TextField,
} from "@heroui/react";
import {
  loginSchema,
  type LoginSchemaType,
} from "../../lib/Schemas/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { userLogin } from "../../Services/auth.service";
import axios from "axios";
import { useNavigate } from "react-router";
import { KeyRound, User } from "lucide-react";
import { useToken } from "../../components/Context/TokenContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signIn(values: LoginSchemaType) {
    try {
      const response = await userLogin(values);
      localStorage.setItem("userToken", response.data.data.token);
      setToken(response.data.data.token);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  }

  return (
    <>
      <section>
        <title>Sign In | Route Post</title>
        <div className="p-6 bg-white rounded-2xl">
          <div className="bg-[#F1F5F9] mb-5 p-1 rounded-xl grid grid-cols-2 ">
            <button
              type="button"
              className="bg-white rounded-lg text-[#00298d] py-2 font-extrabold transition shadow-sm cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
            <button
              type="button"
              className="text-slate-600 hover:text-slate-800 py-2 font-extrabold transition cursor-pointer"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </button>
          </div>
          <h2 className="text-slate-900 font-extrabold text-2xl">
            Log in to Route Posts
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Log in and continue your social journey.
          </p>
          <form className="mt-5 space-y-3.5" onSubmit={handleSubmit(signIn)}>
            <TextField
              aria-label="email"
              className="w-full"
              isInvalid={Boolean(errors.email)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        className="w-full "
                        name="email"
                        aria-label="Email"
                      >
                        <InputGroup className=" rounded-xl border border-slate-200 focus:border-main bg-slate-50 p-1">
                          <InputGroup.Prefix>
                            <User className="text-slate-400" size={18} />
                          </InputGroup.Prefix>
                          <InputGroup.Input
                            {...field}
                            className="w-full text-slate-800 text-sm "
                            placeholder="Email address"
                          />
                        </InputGroup>
                      </TextField>
                    </>
                  );
                }}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
            <TextField
              aria-label="password"
              className="w-full"
              isInvalid={Boolean(errors.password)}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        className="w-full "
                        name="Password"
                        aria-label="Password"
                        type="password"
                      >
                        <InputGroup className=" rounded-xl border border-slate-200 focus:border-main bg-slate-50 p-1">
                          <InputGroup.Prefix>
                            <KeyRound className="text-slate-400" size={18} />
                          </InputGroup.Prefix>
                          <InputGroup.Input
                            {...field}
                            className="w-full text-slate-800 text-sm "
                            placeholder="Password"
                          />
                        </InputGroup>
                      </TextField>
                    </>
                  );
                }}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
            <Button
              type="submit"
              className="bg-main w-full rounded-xl text-white font-extrabold text-base py-6 px-0  hover:bg-[#001F6B] transition"
            >
              {isSubmitting ? (
                <div className="flex gap-2">
                  <Spinner className="text-white" />
                  <p>Loading.....</p>
                </div>
              ) : (
                "Log In"
              )}
            </Button>
            <button
              type="button"
              className="mx-auto text-main font-semibold text-sm block transition hover:underline bg-transparent"
            >
              Forget password?
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
