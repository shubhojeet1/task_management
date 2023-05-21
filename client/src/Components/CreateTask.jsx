import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast ,Link} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";




export default function CreateTask() {
    const toast = useToast()
    const [data, setdata] = useState({
        title: "",
        description: "",
        due_date:""
    })

    const handleChange = (e) => {
        setdata({
          ...data,
            [e.name]: e.value
        })
    }
    console.log(data)

    const handleSubmit = () => {
        axios.post("http://localhost:8000/task", data)
        .then((res)=>{
            toast({
                title: 'Task created.',
                description: "Go to the tasklist in all tasks option.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((err)=>{
            toast({
                title: "Something went wrong",
                description: "Please try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
    }


    return(
        <Box w={{sm:"90vw", lg:"30vw"}} border="1px solid #ccc" padding="20px" margin="auto" borderRadius="10px" backgroundColor="white">
            <Text fontSize="25px" mb="40px">Create Task</Text>
            <Flex direction="column" gap="20px" w="100%">
                <FormControl isRequired>
                    <FormLabel>Task title</FormLabel>
                    <Input placeholder='Title' name="title" onChange={(e)=>handleChange(e.target)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input placeholder='Description' name="description" onChange={(e)=>handleChange(e.target)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Due date</FormLabel>
                    <Input placeholder='Due date' type="date" name="due_date" onChange={(e)=>handleChange(e.target)} />
                </FormControl>
                <Button onClick={handleSubmit}>Create task</Button>
            </Flex>
        </Box>
    )
}