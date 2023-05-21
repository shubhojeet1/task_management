import { Box, Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tasks() {
    const [allTask, setAllTask] = useState([])
    const [page, setPage] = useState(0)
    const toast = useToast()

    useEffect(() => {
        getAllTask(1)
    }, [])

    const getAllTask = async (page) => {
        await axios(`http://localhost:8000/task?page=${page}`)
            .then((res) => {
                setAllTask(res.data.tasks)
                if (res.data.count / 10 !== Math.floor(res.data.count / 10)) {
                    setPage(Math.floor(res.data.count / 10) + 1)
                } else {
                    setPage(res.data.count / 10)
                }
            })
    }

    const changeStatus = async (id, status) => {
        await axios.put(`http://localhost:8000/task?id=${id}`, {
            status: status
        })
        toast({
            title: 'Updadted',
            description: "We have updated task succesfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        getAllTask()
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8000/task?id=${id}`)
        getAllTask()
        toast({
            title: 'Deleted.',
            description: "We have Deleted task succesfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }


    return (
        <Box w="90vw" border="1px solid #ccc" padding="20px" margin="auto" borderRadius="10px" backgroundColor="white" h="90vh" overflow="auto">
            <Box>
                <Text borderBottom="1px solid">In progress</Text>
                <Grid templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} padding="10px 0px" gap="10px">
                    {allTask.map((task) => (
                        task.completed === false ?
                            <Box key={task._id} textAlign="center" padding="10px" border="1px solid" borderRadius="10px">
                                <Text fontSize="18px" as="b">{task.title}</Text>
                                <Text fontSize="14px">{task.description}</Text>
                                <Text fontSize="14px">{task.due_date}</Text>
                                <Flex gap="4%">
                                    <Button w="48%" fontSize="12px" backgroundColor="black" color="white" onClick={() => changeStatus(task._id, true)}>Mark as completed</Button>
                                    <Button w="48%" fontSize="12px" backgroundColor="Red" color="white" onClick={() => deleteTask(task._id)}>Delete Task</Button>
                                </Flex>
                            </Box>
                            : null
                    ))}
                </Grid>
            </Box>
            <Box>
                <Text borderBottom="1px solid">Completed</Text>
                <Grid templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} padding="10px 0px" gap="10px">
                    {allTask.map((task, index) => (
                        task.completed === true ?
                            <Box key={index} textAlign="center" padding="10px" border="1px solid" borderRadius="10px">
                                <Text fontSize="18px" as="b">{task.title}</Text>
                                <Text fontSize="14px">{task.description}</Text>
                                <Text fontSize="14px">{task.due_date}</Text>
                                <Flex gap="4%">
                                    <Button w="48%" fontSize="12px" backgroundColor="black" color="white" onClick={() => changeStatus(task._id, false)}>Mark as pending</Button>
                                    <Button w="48%" fontSize="12px" backgroundColor="Red" color="white" onClick={() => deleteTask(task._id)}>Delete Task</Button>
                                </Flex>
                            </Box>
                            : null
                    ))}
                </Grid>
            </Box>
            <Flex alignItems="center">
                <Text>All pages: </Text>
                {
                    new Array(page).fill(0).map((el, i) => (
                        <Button key={i} onClick={() => getAllTask(i + 1)}>{i + 1}</Button>
                    ))
                }
            </Flex>
        </Box>
    )
}