import request from '../services/request.service';
const useWaterSearchService = {
    getUserResources() {
        return request.get('/mock/getUserResources.json');
    }
};
export default useWaterSearchService;
