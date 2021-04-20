import HttpReq from './requireURL';
const Http = new HttpReq();

export async function getFetch(url:string, params:any) {
    return await Http.getFetch(url, params);
}

export async function postFetch(url:string, params:any) {
    return await Http.doPostDatas(url, params);
}


export async function formFetch(url:string, params:any) {
    return await Http.doPostRawDatas(url, params);
}