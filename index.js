/**
     * 检测ip段是否合法
     * @param content 内容 ip或者段
     * @return bool 是否合法
     */
function checkIpSegment (content) {
    //先是ip-> 最后一位是0还是非0
    let content_arr = [],
        ip = '',
        segment = '';
    if(content.includes('/')){
        content_arr = content.split('/');
        ip = content_arr[0];
        segment = content_arr[1];
        if(isNaN(segment) || segment > 32 || segment === '' || segment < 0 || parseInt(segment) != segment || segment.includes('.')){
            return false;
        }
    }else {
        return Helper.isIPv4(content,true);
    }

    let ip_arr = ip.split('.');

    if(ip_arr[3] != 0){
        let consult = Math.floor(segment / 8),
            mod = segment % 8,
            remain = 8 - mod;
        let bin = [];
        bin[0] = Object.assign([],new Array(8).fill(1,0,mod),new Array(8).fill(0,mod,8));
        bin[0] = bin.join('').toString(2);  //多于部分转换成二进制

        for(let i = consult;consult<3;i++){
            if(i == consult){
                bin = Object.assign([],new Array(8).fill(1,0,mod),new Array(8).fill(0,mod,7));
                bin = bin.join('').toString(2);  //多于部分转换成二进制
            }else {
                bin = new Array(8).fill(0,0,8).join('').toString(2);
            }
            let bin_ip = Object.assign([],new Array(8).fill(0,0,8-ip_arr[consult].toString(2).split('').length),ip_arr[consult].toString(2).split('')).join('').toString(2);  //该组ip的二进制
            let rlt = bin & bin_ip;
            if(rlt != 255 || rlt != 0){
                return true; //有一段不全等于0或者全等1，就为合法的
            }
        }
        //能走到最后 一定不合法
        return false;
    }
    return true; //最后一位为0 为CIDR，没有问题
}