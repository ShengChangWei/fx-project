import requestService from '@/services/request.service.js';
const rainSearchApi = {
    getUserResources() {
        return requestService.get('/mock/getUserResources.json');
    }
};
export default rainSearchApi;
