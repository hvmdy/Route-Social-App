import {
  Button,
  FieldError,
  InputGroup,
  Spinner,
  TextField,
} from "@heroui/react";
import { ListBox, Select } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../../lib/Schemas/Auth.schema";
import { userRegister } from "../../Services/auth.service";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AtSign, Calendar, KeyRound, User, Users } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
  });

  async function submitData(values: RegisterSchemaType) {
    try {
      const response = await userRegister(values);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/auth");
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  }
  return (
    <>
      <section>
        <title>Create Account | Route Post</title>
        <div className="p-6 bg-white rounded-2xl">
          <div className="bg-[#F1F5F9] mb-5 p-1 rounded-xl grid grid-cols-2 ">
            <button
              type="button"
              className="text-slate-600 hover:text-slate-800 py-2 font-extrabold transition cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
            <button
              type="button"
              className="bg-white rounded-lg text-[#00298d] py-2 font-extrabold transition shadow-sm cursor-pointer"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </button>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Create a new account
          </h1>
          <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>
          <form
            className="mt-5 space-y-3.5"
            onSubmit={handleSubmit(submitData)}
          >
            <TextField
              aria-label="name"
              className="w-full"
              isInvalid={Boolean(errors.name)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        className="w-full"
                        name="name"
                        aria-label="full name"
                      >
                        <InputGroup className=" rounded-xl border border-slate-200 focus:border-main bg-slate-50 p-1 ">
                          <InputGroup.Prefix>
                            <User className="text-slate-400" size={18} />
                          </InputGroup.Prefix>
                          <InputGroup.Input
                            {...field}
                            className="w-full text-slate-800 text-sm "
                            placeholder="Full name"
                          />
                        </InputGroup>
                      </TextField>
                    </>
                  );
                }}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </TextField>
            <TextField
              aria-label="username"
              className="w-full"
              isInvalid={Boolean(errors.username)}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        className="w-full "
                        name="username"
                        aria-label="user name"
                      >
                        <InputGroup className=" rounded-xl border border-slate-200 focus:border-main bg-slate-50 p-1">
                          <InputGroup.Prefix>
                            <AtSign size={18} className="text-slate-400" />
                          </InputGroup.Prefix>
                          <InputGroup.Input
                            {...field}
                            className="w-full text-slate-800 text-sm "
                            placeholder="Username"
                          />
                        </InputGroup>
                      </TextField>
                    </>
                  );
                }}
              />
              <FieldError>{errors.username?.message}</FieldError>
            </TextField>
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
                            <AtSign size={18} className="text-slate-400" />
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
              aria-label="gender"
              className="w-full"
              isInvalid={Boolean(errors.gender)}
            >
              <Controller
                name="gender"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Select
                        {...field}
                        aria-label="gender"
                        className="w-full"
                        placeholder="Select gender"
                      >
                        <Select.Trigger className="p-3 bg-slate-50 ">
                          <InputGroup.Prefix className="pe-3">
                            <Users size={18} className="text-slate-400" />
                          </InputGroup.Prefix>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="male" textValue="male">
                              Male
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="female" textValue="female">
                              Female
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </>
                  );
                }}
              />
              <FieldError>{errors.gender?.message}</FieldError>
            </TextField>
            <TextField
              aria-label="dateOfBirth"
              className="w-full"
              isInvalid={Boolean(errors.dateOfBirth)}
            >
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        className="w-full "
                        name="dateOfBirth"
                        aria-label="Date"
                        type="date"
                      >
                        <InputGroup className=" rounded-xl border border-slate-200 focus:border-main bg-slate-50 p-1">
                          <InputGroup.Prefix>
                            <Calendar className="text-slate-400" size={18} />
                          </InputGroup.Prefix>
                          <InputGroup.Input
                            {...field}
                            className="w-full text-slate-800 text-sm "
                          />
                        </InputGroup>
                      </TextField>
                    </>
                  );
                }}
              />
              <FieldError>{errors.dateOfBirth?.message}</FieldError>
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
            <TextField
              aria-label="rePassword"
              className="w-full"
              isInvalid={Boolean(errors.rePassword)}
            >
              <Controller
                name="rePassword"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        className="w-full "
                        name="rePassword"
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
                            placeholder="Confirm password"
                          />
                        </InputGroup>
                      </TextField>
                    </>
                  );
                }}
              />
              <FieldError>{errors.rePassword?.message}</FieldError>
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
                "Create New Account"
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
