import requestService from '../services/request.service.js';
const useWaterSearchApi = {
    getUserResources() {
        return requestService.get('/mock/getUserResources.json');
    }
};
export default useWaterSearchApi;
