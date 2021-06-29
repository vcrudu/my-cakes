import Cake from './dataObjects/Cake';
import {backendLink} from '../consts';

class CakesDataAccess {
    static async getCakesList(): Promise<Array<Cake>> {
        let cakesRespose: any = await fetch(`${backendLink}/api/cakes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let cakesResposeJson: Array<Cake> = await cakesRespose.json()

        let cakes: Array<Cake> = [];
        return cakesResposeJson;
    }

    static async addNewCake(newCake: Cake, file: File): Promise<Cake | null> {
        let cakesRespose: any = null;
        cakesRespose = await fetch(`${backendLink}/api/cakes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCake)
        });
            let cakeResult: Cake = await cakesRespose.json()
            const fileNameparts = file.name.split('.');
            const fileExtension = fileNameparts[fileNameparts.length - 1];
            var formData = new FormData()
            formData.append('file', file as Blob)
            formData.append('name', `${newCake.id}.${fileExtension}`)
            await fetch(`${backendLink}/api/images`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Request-Headers': 'Content-Length,Accept,Authorization,Content-Type'
                },
                body: formData
            })
            return cakeResult;
    }

    static async deleteCake(id: string): Promise<Cake | null> {
        let deleteRespose: any = null;
        deleteRespose = await fetch(`${backendLink}/api/cakes/${id}`, {
            method: 'DELETE'
        });
        return deleteRespose;
    }
}

export default CakesDataAccess;