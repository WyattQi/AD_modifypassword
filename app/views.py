# coding=utf-8
#

from app import app
from flask import request, render_template, jsonify, session
from ad.auth import auth_user, modify_user_password
from config import ADConfig


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # session['code'] = 'code123'
        return render_template('login.html', domain=ADConfig.domain)
    else:
        try:
            # if 'code' not in session:
            #     raise KeyError
            # else:
            #     if session['code'] != request.form['code']:
            #         return jsonify({'errcode': 2, 'msg': u'验证码输入错误'})
            if auth_user(request.form['email'], request.form['pass']):
                session['u'] = request.form['email']
                return jsonify({'errcode': 0, 'msg': ''})
            else:
                return jsonify({'errcode': 1, 'msg': u'用户名或密码错误!'})
        except KeyError:
            return jsonify({'errcode': 9, 'msg': u'提交信息不完整!'})


@app.route('/next', methods=['GET', 'POST'])
def login_next():
    if request.method == 'GET':
        # session.pop('code', None)
        return render_template('next.html', domain=ADConfig.domain)
    else:
        if 'u' not in session:
            return jsonify({'errcode': 8, 'msg': u'未登陆'})
        if 'pass' not in request.form:
            return jsonify({'errcode': 1, 'msg': u'必须输入密码'})
        else:
            ret, msg = modify_user_password(session['u'], request.form['pass'])
            if ret:
                session.pop('u', None)
                return jsonify({'errcode': 0, 'msg': ''})
            else:
                return jsonify({'errcode': 9, 'msg': msg})


@app.route('/success')
def success():
    return render_template('success.html', domain=ADConfig.domain)
