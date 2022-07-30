import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" p={4} color="black" w="100%" borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded' >
  <TabList marginBottom="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sing Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
     <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
