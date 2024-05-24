utils.jq(() => {
    const el = document.querySelector('.ds-twikoo');
    utils.onLoading(el); // 加载动画
    const api = el.getAttribute('api');
    const limit = parseInt(el.getAttribute('limit')) || 10;
    const reply = el.getAttribute('hide') !== 'reply';
    if (!api) return;
    fetch(api, {
      method: "POST",
      body: JSON.stringify({
        "event": "GET_RECENT_COMMENTS",
        "envId": api,
        "pageSize": limit,
        "includeReply": reply
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(({ data }) => {
      utils.onLoadSuccess(el); // 移除动画
      //cicada 1
      data.forEach((comment, j) => {
        //cicada 1
        // let commentText = comment.commentText;
        // //if (!commentText || commentText.trim() === '') return; // 跳过空评论 //cicada comment 1
        // // 转义字符
        // commentText = commentText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        // commentText = commentText.length > 50 ? commentText.substring(0, 50) + '...' : commentText;
        //cicada 0
        var cell = '<div class="timenode" index="' + j + '">';
        cell += '<div class="header">';
          // 添加用户头像
        cell += '<div class="user-info">';
        const avatarImg = `<img class="user-avatar" src="${comment.avatar}" alt="Avatar">`;
        cell += avatarImg;
        cell += '<span>' + comment.nick + '</span>';
        cell += '</div>';
        //cell += '<span>' + new Date(comment.created).toLocaleString() + '</span>';
        cell += '<span>' + new Date(comment.created).toLocaleDateString() + '</span>'; //cicada modify
        cell += '</div>';
        let commentHTML = comment.comment;
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = commentHTML;      
        //cicada comment 1
        // cell += '<a class="body" href="' + comment.url + '#' + comment.id + '">';
        // cell += commentText; //
        // cell += '</a>';
        //cicada comment 0
        // 提取文本内容
        let textContent = tempDiv.textContent || tempDiv.innerText;          
        // 创建一个变量用于存储图片HTML
        let imagesHTML = '';
        const images = tempDiv.querySelectorAll('img');
        // 遍历所有图片，构建图片HTML字符串，并设置样式属性
        images.forEach(img => {
          let imgSrc = img.src;
          // 此处应添加逻辑以确保图片URL是可接受的
          if (imgSrc) {
            let imgTag = `<img src="${imgSrc}" style="max-height: 50px; width: auto;" alt="Image from comment">`;
            imagesHTML += imgTag; // 将图片添加到imagesHTML字符串
          }
        });
        // 构建带有文本和图片的完整评论内容
        let commentContent = textContent + '<div style="clear: both;"></div>' + imagesHTML;  
        cell += '<a class="body" href="' + comment.url + '#' + comment.id + '">';
        cell += commentContent; // 将文本和图片添加到cell中
        cell += '</a>';
        cell += '</div>';  
        // 使用jQuery的append方法将cell添加到页面中的元素el中
        $(el).append(cell);
      });
    })
    .catch(() => utils.onLoadFailure(el));
  });