# AD_modifypassword

准备环境
AD域XXX.com
启用LDAPS
python 2.7

效果预览
<img align="center" src="https://raw.githubusercontent.com/WyattQi/AD_modifypassword/master/preview.png"></img>







完毕安装依赖环境
pip install -r requirements.txt




根据实际情况修改 config.py配置
class ADConfig(object):
    server = '192.168.241.141'
    baseDN = 'dc=test,dc=com'
    adminDN = 'administrator'
    adminPWD = 'Aa123456'
    netbios_name = 'TEST'
    domain = 'test.com'



进入runserver.py目录，运行runserver.py打开浏览器即可看到效果.



需改进
前段js代码比较粗糙
可添加验证码来提高安全
后续可采用 flask-login来控制登陆增加网站安全




配置网站
请参考apche2 + modwsgi 或者nginx + uwsgi等来发布
