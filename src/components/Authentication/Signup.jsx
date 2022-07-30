import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const toast = useToast();

  const handleShowHide = () => {
    setPassShow(!passShow);
  };
  const handleConfirmShowHide = () => {
    setConfirmPassShow(!confirmPassShow);
  };
  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        description:
          "You need to select a valid image for creating your account.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return setLoading(false);
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg" ||
      pics.type === "image/gif" ||
      pics.type === "image/bmp"
    ) {
      try {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "nurul");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/nurulislam/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const getData = await response.json();
        console.log(getData.url.toString());
        setPic(await getData?.url?.toString());
        return setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to upload! Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return setLoading(false);
      }
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitSignUpHandler = () => {};
  return (
    <>
      <VStack spacing="5px" color="black">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={passShow ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowHide}>
                {passShow ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={confirmPassShow ? "text" : "password"}
              placeholder="Enter Your Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleConfirmShowHide}>
                {confirmPassShow ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload Your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitSignUpHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
