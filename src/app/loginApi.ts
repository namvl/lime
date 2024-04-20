// api.ts
import axios from 'axios';

export interface LoginResponse {
  accessToken: string; // Giả sử API trả về một trường token khi đăng nhập thành công
}

// Hàm này gửi yêu cầu đến endpoint đăng nhập của API
export const loginApi = async (userData: { email: string, password: string }): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('https://backengine-on48.fly.dev/login', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login: ' + error);
  }
};
