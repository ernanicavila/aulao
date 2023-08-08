import api from '.';

class CharacterService {
	getAll(name = '', status = '') {
		return api.get(`/?name=${name}&status=${status}`);
	}
}
const char = new CharacterService();
export default char;
