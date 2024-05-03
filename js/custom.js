// adjust-code-block-height.js
document.addEventListener("DOMContentLoaded", function() {
    // 选择所有的.md-text元素
    var codeBlocks = document.querySelectorAll('.md-text');
    // 遍历每个.md-text元素
    codeBlocks.forEach(function(block) {
      // 检查是否包含.highlight类的子元素，且父元素高度超过500px
      var highlightBlocks = block.querySelectorAll('.highlight');
      highlightBlocks.forEach(function(highlightBlock) {
        if (highlightBlock.clientHeight > 800) {
          highlightBlock.style.maxHeight = '300px';
          highlightBlock.style.overflow = 'auto';
        }
      });
    });
  });
  

//节日弹窗图片
  document.addEventListener('DOMContentLoaded', function () {
    var holidays = [
      { startDate: '2024-01-01', endDate: '2024-01-01', image: '/asset/images/festivals/newyear.gif' },
      { startDate: '2024-02-10', endDate: '2024-02-16', image: '/asset/images/festivals/springfestival.gif' },
      { startDate: '2024-04-05', endDate: '2024-04-05', image: '/asset/images/festivals/清明.gif' },
      { startDate: '2024-05-01', endDate: '2024-05-05', name:"劳动节", image: '/asset/images/festivals/laborsday.gif' },
      { startDate: '2024-05-12', endDate: '2024-05-12', name:"母亲节", image: '/asset/images/festivals/mothersday.gif'},
      { startDate: '2024-06-08', endDate: '2024-06-10', name:"端午节", image: '/asset/images/festivals/dragonboat.gif' },
      { startDate: '2024-06-16', endDate: '2024-06-16', name:"父亲节", image: '/asset/images/festivals/fathersday.gif' },
      { startDate: '2024-08-10', endDate: '2024-08-10', name:"七夕", image: '/asset/images/festivals/qixi.gif'},
      { startDate: '2024-09-15', endDate: '2024-09-17', name:"中秋节", image: '/asset/images/festivals/midautumn.gif' },
      { startDate: '2024-10-01', endDate: '2024-10-07', name:"国庆节", image: '/asset/images/festivals/nationalday.gif' },
      { startDate: '2024-10-31', endDate: '2024-10-31', name:"万圣节", image: '/asset/images/festivals/halloween.gif'},
      { startDate: '2024-12-25', endDate: '2024-12-25', name:"圣诞节", image: '/asset/images/festivals/christmas.gif' }
    ];

    var currentDate = new Date();
    if (!sessionStorage.getItem('festivalShown')) {
        holidays.forEach(function(holiday) {
            var startDate = new Date(holiday.startDate + " 00:00:00");
            var endDate = new Date(holiday.endDate + " 23:59:59");
            if (currentDate >= startDate && currentDate <= endDate) {
                sessionStorage.setItem('festivalShown', 'true');
                var banner = document.createElement('img');
                banner.src = holiday.image;
                banner.style = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; max-width: 90%; max-height: 80%; border-radius: 15px; cursor: pointer;";
                var overlay = document.createElement('div');
                overlay.style = "position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); top: 0; left: 0; z-index: 999; cursor: pointer;";
                overlay.onclick = banner.onclick = function () {
                    document.body.removeChild(banner);
                    document.body.removeChild(overlay);
                };
                document.body.appendChild(overlay);
                document.body.appendChild(banner);
            }
        });
    }
});

