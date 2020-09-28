import axios from 'axios';

const url = 'api/tasklist/';

class tasklistService {
    //Get tasklist
    static getTasklist() {
        return new Promise ((resolve, reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map (tasklist => ({
                        ...tasklist,
                        dateCreated: new Date(tasklist.dateCreated)
                    }))
                );
            })
            .catch((err) => {
                reject(err);
            })
        })
    } 

    //Create tasklist
    static insertTasklist(task){
        return axios.post(url, {task});
    }

    //Delete tasklist 
    static deleteTasklist(id){
        return axios.delete(`${url}${id}`);
    }
}

export default tasklistService;