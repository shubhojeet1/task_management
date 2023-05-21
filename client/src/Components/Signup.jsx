import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast , Link } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Signup() {
    const navigate = useNavigate();
    const toast = useToast()
    const [data, setdata] = useState({
        name:"",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setdata({
          ...data,
            [e.name]: e.value
        })
    }

    const handleSubmit = () => {
        axios.post("https://subho-backend-production.up.railway.app/user/signup", data)
        .then((res)=>{
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate("/login");
        })
        .catch((err)=>{
            console.log(err)
            toast({
                title: err.response.data,
                description: "Please try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    return(
        <Box w={{sm:"90vw", lg:"30vw"}} border="1px solid #ccc" padding="20px" margin="auto" borderRadius="10px" backgroundColor="white">
            <Text fontSize="25px" mb="40px">Signup</Text>
            <Flex direction="column" gap="20px" w="100%">
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Name' name="name" onChange={(e)=>handleChange(e.target)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email'  name="email" onChange={(e)=>handleChange(e.target)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input  placeholder='Password' type="password"  name="password" onChange={(e)=>handleChange(e.target)} />
                </FormControl>
             <Button  onClick={handleSubmit}>Signup</Button>
            </Flex>
        </Box>
    )
}