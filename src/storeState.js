import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/files'

export default createStore({
    files: [],
    setFiles: action((state, payload) => {
        state.files = payload
    }),
    fileName: [],
    setFileName: action((state, payload) => {
        state.fileName = payload
    }),
    fileContent: [],
    setFileContent: action((state, payload) => {
        state.fileContent = payload
    }),
    fileHeaders: [],
    setFileHeaders: action((state, payload) => {
        state.fileHeaders = payload
    }),
    userName: '',
    setUserName: action((state, payload) => {
        state.userName = payload
    }),
    ifLogin: false,
    setIfLogin: action((state, payload) => {
        state.ifLogin = payload
    }),
    colorSets: ['#82ca9d','#8884d8','#83a6ed','#8dd1e1','#82ca9d','#a4de6c','#d0ed57','#ffc658'],
    saveFile: thunk(async (actions, newFile, helpers) => {
        const { files } = helpers.getState();
        try {
            const response = await api.post('/files', newFile);
            actions.setFiles([...files, response.data]);
            actions.setFileName([]);
            actions.setFileContent([]);
            actions.setFileHeaders([]);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),

    deleteFile: thunk(async (actions, id, helpers) => {
        const { files } = helpers.getState();
        try {
            await api.delete(`/files/${id}`);
            actions.setFiles(files.filter(file => file.id !== id));
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    
    getFileById: computed((state) => {
        return (id) => state.files.find(file => (file.id).toString() === id);
    }),

});