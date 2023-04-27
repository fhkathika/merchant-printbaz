const dataD = async (productName) => {
    let fileName = await require(`${productName}`);
    let rawdata = fileName;
    
    return rawdata;
}

export default dataD;