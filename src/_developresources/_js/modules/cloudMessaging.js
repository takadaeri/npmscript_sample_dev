// cloud messaging
// 通知の許可をリクエスト、本来はサーバーなどにトークンを保存する

export default class cloudMessaging {

  constructor(firebase) {

    this.firebase = firebase;
    this.messaging = this.firebase.messaging();
    // アプリにウェブ認証情報を構成する
    this.messaging.usePublicVapidKey('BMm3rmg4Ms3Tmxy8WBRueeLTzxg6Tftzn9EAiVIQbc8UhcjimK0LUWVSKLBAutFz9qMXj9s_dAD8rh38aabRDkA');

    this.requestBtn = document.querySelector('.js-fcm_request');
    this.deleteBtn = document.querySelector('.js-fcm_delete');
    this.fcmenable = document.querySelector('.js-fcm_enable');
    this.yourtoken = document.querySelector('.js-fcm_yourtoken');
    this.event();

  }

  event() {

    this.viewTokun();
    
    this.requestBtn.onclick = ()=>{
        this.request();
    };

    this.deleteBtn.onclick = ()=>{
        this.deleteToken();
    };
  }

  request() {
    // 通知の受信許可をリクエストする
    this.messaging.requestPermission().then(() => {
        console.log('通知許可が付与されました。');
        if (this.fcmenable) this.fcmenable.innerText = 'OK';
     
        // 現在の登録トークンの取得
        this.messaging.getToken().then( (token) => {
              if (token) {
                this.yourtoken.innerText = token;
                // 本来ならトークン管理のためここでサーバーにトークンを送る
                // this.sendTokenToServer(token);
                // this.updateUIForPushEnabled(token);
              } else {
                console.log('使用可能なインスタンスIDトークンはありません。通知許可をリクエストしてください。');
                // 通知許可リクエストのUIを表示する
                // this.updateUIForPushPermissionRequired();
                // this.setTokenSentToServer(false);
              }
        });
     
        // トークン更新のモニタリング
        this.messaging.onTokenRefresh(() => {
            this.messaging.getToken().then((refreshedToken) => {
                console.log('トークンが更新されました。', refreshedToken);
                // 本来ならトークン管理のためここでサーバーにトークンを送る
                // this.setTokenSentToServer(false);
                // this.sendTokenToServer(refreshedToken);
            }).catch((err) => {
                console.log('更新されたトークンの取得に失敗しました。', err);
            });
        });

    }).catch((err) => {
        console.log('通知する許可を取得できていません。', err);
    });

  }

  viewTokun() {
    // 現在の登録トークンの取得
    this.messaging.getToken().then( (token) => {
      if (token) {
        this.fcmenable.innerText = 'OK';
        this.yourtoken.innerText = token;
      } else {
        console.log('使用可能なインスタンスIDトークンはありません。通知許可をリクエストしてください。');
      }
    });
  }

  deleteToken() {
    // トークンを取得できるか確認
    this.messaging.getToken().then( (currentToken)=> {
        // トークンを削除する
        this.messaging.deleteToken(currentToken).then(function() {
            console.log('トークンを削除しました。');
        }).catch(function(err) {
          console.log('トークンの削除に失敗しました。', err);
        });
    }).catch(function(err) {
        console.log('トークンの取得に失敗しました。', err);
    });
  }

}