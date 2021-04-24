import fetch from "node-fetch";

const BASE_URL =
    " http://s3.irvinsaltedegg.com.s3-ap-southeast-1.amazonaws.com/engineering-test/products.json";

const fetch_products = async () => {
    let fetchPath = `${BASE_URL}`;
    let resp = await fetch(fetchPath, { method: "get" });
    if (resp.status !== 200) return [];
    resp = await resp.json();
    return resp;
};

export { fetch_products };
