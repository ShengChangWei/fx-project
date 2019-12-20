import request from '../services/request.service';
const useWaterManageService = {
    getUserResources() {
        return request.get('/mock/getUserResources.json');
    }
};
export default useWaterManageService;
