import axios from "axios";
import { Cat, Vote } from "../types/api";

const client = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
      'Content-Type': 'application/json',
      /** For real worl app, the secret keys should be on an environment test */
      'x-api-key': 'live_GhmNBspv1M4sXZgO2oE28mQd4t0SCT1Lhki0uSaIzLEqBL8LTrBMJQ6FpApZD3lv'
    }
});

export const getCats = async (limit: number = 10): Promise<Cat[]> => {
    try {
      const response = await client.get('/images/search', {
        params: {
          limit,
          has_breeds: 1,
          order: 'RANDOM'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching random cats:', error);
      throw error;
    }
}

export const voteCat =  async (imageId: string, value: number): Promise<any> => {
    try {
      const voteData: Vote = {
        image_id: imageId,
        value: value,
      };
      
      const response = await client.post('/votes', voteData);
      return response.data;
    } catch (error) {
      console.error('Error voting on cat:', error);
    }
};