import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

const SingInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: 300,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Name Field */}
      <TextField
        label="Name"
        variant="outlined"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      {/* Email with regex */}
      <TextField
        label="Email"
        variant="outlined"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid email format",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {/* Phone with Indian regex */}
      <TextField
        label="Phone"
        variant="outlined"
        {...register("phone", {
          required: "Phone is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Invalid Indian phone number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};


export default SingInPage


// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { TextField, Button, Box } from "@mui/material";

// const SingInPage = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{
//         width: 300,
//         mx: "auto",
//         mt: 4,
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//       }}
//     >
//       {/* Name Field */}
//       <Controller
//         name="name"
//         control={control}
//         rules={{ required: "Name is required" }}
//         render={({ field }) => (
//           <TextField
//             label="Name"
//             variant="outlined"
//             {...field}
//             error={!!errors.name}
//             helperText={errors.name?.message}
//           />
//         )}
//       />

//       {/* Email Field */}
//       <Controller
//         name="email"
//         control={control}
//         rules={{
//           required: "Email is required",
//           pattern: {
//             value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//             message: "Invalid email format",
//           },
//         }}
//         render={({ field }) => (
//           <TextField
//             label="Email"
//             variant="outlined"
//             {...field}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />
//         )}
//       />

//       {/* Phone Field */}
//       <Controller
//         name="phone"
//         control={control}
//         rules={{
//           required: "Phone is required",
//           pattern: {
//             value: /^[6-9]\d{9}$/,
//             message: "Invalid Indian phone number",
//           },
//         }}
//         render={({ field }) => (
//           <TextField
//             label="Phone"
//             variant="outlined"
//             {...field}
//             error={!!errors.phone}
//             helperText={errors.phone?.message}
//           />
//         )}
//       />

//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default SingInPage;
