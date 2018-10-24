import axios from 'axios';

export class UploadService {
    static transcode(key: string) {
        return axios.put(`transcoder:3000/api/transcode/${key}/async`);
    }
}
