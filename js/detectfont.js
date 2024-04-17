<script>
document.addEventListener("DOMContentLoaded", function() {
  // 选择特定的元素
  const postTitles = document.querySelectorAll('.l_main .post-list .post-title');

  // 遍历每一个元素并打印当前字体家族和font-weight，以帮助诊断
  postTitles.forEach(function(postTitle) {
    const style = window.getComputedStyle(postTitle);
    const fontFamily = style.fontFamily;
    console.log('Current font-family:', fontFamily); // 打印字体家族
    console.log('Current font-weight:', style.fontWeight); // 打印当前的font-weight

    // 检查是否包含"LXGW WenKai Screen"
    if (fontFamily.includes('LXGW WenKai Screen')) {
      postTitle.style.fontWeight = '600'; // 设置更重的字重
      console.log('Font weight set to 600 for:', postTitle); // 确认设置动作
    }
  });
});
</script>
