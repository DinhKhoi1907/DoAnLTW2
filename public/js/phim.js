// $(function(){
//     //Số lượng từ giới hạn
//     var limitW = 120;
//     //Số ký tự của từ
//     var char = 4;
//     var txt = $('.plotMovie').html();
//     var txtStart = txt.slice(0,limitW).replace(/\w+$/,'');
//     var txtEnd = txt.slice(txtStart.length);
//     if ( txtEnd.replace(/\s+$/,'').split(' ').length > char ) {
//         $('.plotMovie').html([
//             txtStart,
//             '<a href="#" class="more">xem thêm...</a>',
//             '<span class="detail">',
//             txtEnd,
//             '</span>'
//         ].join('')
//       );
//     }
    
//     $('span.detail').hide();
//     $('a.more').click(function() {
//         $(this).hide().next('span.detail').fadeIn();
//         return false;
//     });
// });