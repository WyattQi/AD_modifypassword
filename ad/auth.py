# coding=utf-8
#

from config import ADConfig
from ldap3 import Server, Connection, NONE, NTLM
from ldap3.core.exceptions import LDAPBindError, LDAPException


server = Server(host=ADConfig.server, port=389, use_ssl=False, get_info=NONE)
server_ssl = Server(ADConfig.server, port=636, use_ssl=True, get_info=None)
admin_conn = Connection(server_ssl, user=r'%s\%s' % (ADConfig.netbios_name, ADConfig.adminDN),
                        password=ADConfig.adminPWD, authentication=NTLM, auto_bind=True)


class ADException(Exception):
    u"""捕获所有LDAP异常，返回供前段显示信息"""
    def __index__(self, *args):
        self.args = args


def auth_user(user, pwd):
    try:
        with Connection(server, user=r'%s\%s' % (ADConfig.netbios_name, user),
                        password=pwd, authentication=NTLM, auto_bind=True):
            return True
    except LDAPBindError:
        return False
    except LDAPException as e:
        raise ADException(repr(e))


def modify_user_password(user, pwd):
    admin_conn.search(ADConfig.baseDN, '(SamAccountName=%s)' % user, attributes=['DistinguishedName'])
    e = admin_conn.entries
    if len(e) == 0:
        return False, u'没有检索到用户'
    else:
        admin_conn.extend.microsoft.modify_password(e[0].DistinguishedName.value, pwd)
        if admin_conn.result['result'] == 0:
            return True, True
        else:
            return False, admin_conn.result['message']
