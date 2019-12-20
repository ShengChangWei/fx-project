import requestService from '@/services/request.service.js';
const useWaterManageApi = {
    getUserResources() {
        return requestService.get('/mock/getUserResources.json');
    }
};
export default useWaterManageApi;
