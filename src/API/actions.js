import axios from "axios";

//users
export const addUser = async(item) => {
    try{
        const {data} = await axios.post("/user/adduser",item)
        return data;
    }catch (e){
        console.log(e)
    }
}
export const Login = async( username, password ) => {
    try{
        const { data } = await axios.post('/user/login', { username, password })
        return data;
    }catch (e){
        console.log(e)
    }
}


//Projects
export const getProjects = async() => {
    try{
        const {data} = await axios.get("/project/")
        return data;
    }catch (e){
        console.log(e)
    }
}


export const getProjectsById = async() => {
    try{
        const {data} = await axios.get("/project/:id")
        return data;
    }catch (e){
        console.log(e)
    }
}

export const addProject = async(item) => {
    try{
        const {data} = await axios.post("/project/addproject",item)
        return data;
    }catch (e){
        console.log(e)
    }
}
export const deleteProject = async(projectName) => {
    try{
        const {data} = await axios.delete(`/project/${projectName}/`)
        return data;
    }catch (e){
        console.log(e)
    }
}


//Scenarios
export const getScenarios = async() => {
    try{
        const {data} = await axios.get("/scenario/")
        return data;
    }catch (e){
        console.log(e)
    }
}

export const getScenariosByProjectName = async(projectName) => {
    try{
        const {data} = await axios.get(`/scenario/${projectName}/`)
        return data;
    }catch (e){
        console.log(e)
    }
}
export const addScenario = async(item) => {
    try{
        const {data} = await axios.post("/scenario",item)
        return data;
    }catch (e){
        console.log(e)
    }
}


//tests
export const getTests = async() => {
    try{
        const {data} = await axios.get("/test/")
        return data;
    }catch (e){
        console.log(e)
    }
}

export const getTestsById = async(testName) => {
    try{
        const {data} = await axios.get(`/test/${testName}/`)
        return data;
    }catch (e){
        console.log(e)
    }
}
export const addTest = async(item) => {
    try{
        const {data} = await axios.post("/test",item)
        return data;
    }catch (e){
        console.log(e)
    }
}

export const deleteTest = async(testName) => {
    try{
        const {data} = await axios.delete(`/test/${testName}/`)
        return data;
    }catch (e){
        console.log(e)
    }
}

//operations
export const getOperations = async() => {
    try{
        const {data} = await axios.get("/operation/")
        return data;
    }catch (e){
        console.log(e)
    }
}

export const getOperationsById = async() => {
    try{
        const {data} = await axios.get("/operation/:id")
        return data;
    }catch (e){
        console.log(e)
    }
}
export const addOperation = async(item) => {
    try{
        const {data} = await axios.post("/operation",item)
        return data;
    }catch (e){
        console.log(e)
    }
}