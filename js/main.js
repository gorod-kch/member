var test = [
    {"Какой улицы <br>нет в Качканаре?":{
            "Тургенева": 0,
            "Чехова": 0,
            "Маяковского": 0,
            "Достоевского": 1
        }
    },
    {"Сколько лет <br>строилась<br> 8 школа?":
        {
            "5 лет": 0,
            "7 лет": 0,
            "24 года": 1,
            "9 лет":0
        }
    },
    {"Местное название<br>круглой площадки<br>у Дворца культуры:":
        {
            "Сковородка": 1,
            "Тарелка": 0,
            "Кастрюля": 0,
            "Стакан": 0
        }
    },
    {"Стену, которая отделяет<br>4 микрорайон от улицы Свердлова, называют:":
        {
            "Качканарская стена": 0,
            "Китайская стена": 1,
            "Берлинская стена": 0,
            "Никак. Просто стена и всё!": 0
        }
    },
    {"Что произошло с кинотеатром «Юность»:":
        {
            "Сгорел": 0,
            "Не пережил суровые 90-ые": 0,
            "Стал торговым центром": 0,
            "Все варианты верны": 1
        }
    },
    {"Что находится на дне качканарского пруда?":
        {
            "Деревья":1,
            "Атлантида": 0,
            "Спанч Боб": 0,
            "Да, ничего такого… <br>рыбка да раки":0
        }
    },
    {"Что такое «валик»?":
        {
            "Строительный инструмент":0,
            "Разновидность подушки":0,
            "Сокращенное имя Валентин":0,
            "Поселок под Качканаром":1
        }
    },
    {"Как переводится Шад Тчуп Линг — <small>название единственного на Урале Буддийского монастыря?</small>":
        {
            "Место исполнения желаний":1,
            "Место красоты и вдохновения":0,
            "Место свободы и любви":0,
            "Место встречи изменить нельзя":0
        }
    },
    {"Что находится с обратной стороны горы Качканар?":
        {
            "Край света":0,
            "Просто лес":0,
            "Деревня Косья":1,
            "Город Лесной":0
        }
    },
    {"Как называется паблик с самыми красивыми видами Качканара?":
        {
            'Моя провинция<br><div id="vk_groups"></div>':1
        }
    }
];

var specials = {};

var question = 0;
var result = 0;
var isSpecial = false;

// Заполняем прогресс
for (var i = 0; i < test.length; i++) {
    $('.progress').append('<li class="progress__item">'+(i+1)+'</li>');
}
$('.progress__item').eq(0).addClass('progress__item_active');

$('.app').hide();
$('.splashscreen__close').on('click', function(event) {
    event.preventDefault();

    $('.splashscreen').hide();

    if(isMobile) {
        $('.app').show();
    } else {
        $('.preloader').show();
        setTimeout(function(){
            $('.preloader').hide();
            $('.app').show();
        }, 2000);
    }

});


// $('.preloader').show();
// setTimeout(function(){
//     $('.preloader').hide();
//     $('.app').fadeIn();
// }, 2100);


// Первый вопрос - ответы
$('.question').html(Object.keys(test[0]));

$.each(test[0][ Object.keys(test[0]) ], function(index, val) {
    $('.answers').append('<li data-is-true="'+val+'">'+ index +'</li>');
});



// Действие по клику на ответ
$('.answers').on('click', 'li', function(e) {
    e.preventDefault();

    var isTrue = parseInt($(this).data('is-true'));

    // Прибавляем баллы за ответ
    result = result + isTrue;

    // Если это был последний вопрос — выведем результат
    if (question == test.length-1) {
        showResult();
        return;
    }

    if (isTrue) {
        $(this).addClass('answer_true');
    } else {
        $(this).addClass('answer_false');
    }


    var nextQuestion = question+1;

    // if(typeof specials[question + "-" + percent] == "function"){
    //     isSpecial = true;
    //     specials[question + "-" + percent]();
    //     setTimeout(function(){
    //         $('.special').hide();
    //         $('main').show();
    //             $('.face').attr('src', 'img/faces/' + (question+1) + '.png');
    //     },3000);
    // } else {
    //     isSpecial = false;
    // }
    //

    // Анимация
    $('main').delay(500).fadeOut(function(){
        $('.progress__item').removeClass('progress__item_active');
        //$('.progress li').eq(question).addClass('archive');

        // Next question
        $('.progress__item').eq(nextQuestion).addClass('progress__item_active');

        $('.question').html(Object.keys(test[nextQuestion]));

        $('.answers li').remove();
        $.each(test[nextQuestion][ Object.keys(test[nextQuestion]) ], function(index, val) {
            $('.answers').append('<li data-is-true="'+val+'">'+ index +'</li>');
        });

        if(nextQuestion == 9) {
            VK.Widgets.Group("vk_groups", {mode: 3, width: "300"}, 62858261);
            console.log(nextQuestion);
        }

        if(!isMobile){
            $('body').css('background-image', 'url("./images/questions/'+(nextQuestion+1)+'.png")');
        } else {
            $('body').css('background-image', 'url("./images/mobile-questions/'+(nextQuestion+1)+'.png")');
        }
        $('main').fadeIn();
    });


    question = nextQuestion;
});


function showResult(){
    $('main').hide();
    $('.results').css('display','flex');
    $('.results__number').text(result);

    if(result < 4) {
        $('.results__subheader').text('Критический уровень');
        $('.results__description').html('<p>Да уж... Печально. Если ты житель Качканара, то тебе должно быть стыдно. На твоём фоне даже мигранты из Средней Азии выглядят более эрудированными. Прости, друг, но ты не имеешь морального права называть себя качканарцем. По крайней мере пока.</p>');
    } else if (result >=4 && result < 7) {
        $('.results__subheader').text('Средний уровень');
        $('.results__description').html('<p>Ну, не сказать, что ты уж прям красавчик, однако некоторые вещи о Качканаре всё же знаешь (если, конечно, не тыкал наугад).</p><p>Рекомендуем пройти тест ещё раз и провести работу над ошибками. Законспектируй вопросы, в которых допустил ошибки, и повторяй каждый вечер перед сном. Следуя данной инструкции, ты сможешь со временем повысить уровень своих знаний о родном городе.</p>');
    } else if (result >= 7 && result < 10) {
        $('.results__subheader').text('Высокий уровень');
        $('.results__description').html('<p>А ты не плох! Пусть и не ответил правильно на все вопросы, но твёрдую четвёрку всё же заработал. Не забывай, что хоть твой уровень и выше среднего, тебе по-прежнему есть куда стремиться. Оттачивай свои знания о Качканаре, подписывайся на «ЗНАЙ» и будь счастлив!</p>');
    } else {
        $('.results__subheader').text('Уровень: мудрец');
        $('.results__description').html('<p>Блеск! Ты правильно ответил на все вопросы! Далеко не каждый житель города может похвастаться такими знаниями! Обязательно опубликуй результат теста на своей стене - пусть твои друзья знают, насколько ты крут. </p><p>Без всяких шуток, ты по праву заслужил звание «Настоящий Качканарец»!</p>');
    }

    // if(typeof VK !== 'undefined') {
    //     VK.api('wall.post', {
    //         message: 'Я на 00 Качканарец. А ты?\n\nУзнай в приложении',
    //         attachments: 'https://vk.com/app5753070_-46359936',
    //         v:'5.45'
    //     },function(data) {
    //     });
    // }

    VK.init({
        apiId: 5753070,
    });
    VK.Auth.login(function(){
        VK.api("wall.post", {"message": "Я качканарец на "+result+" из 10.\n\n Оцени свои знания о Качканаре, пройди тест https://vk.com/app5753070_-46359936!", "attachments":"photo39014702_456239116,https://vk.com/app5753070_-46359936"}, function (data) {});

    });
}


// Прелоад
for (var i = 1; i <= test.length; i++) {
    $("<img />").attr("src", 'images/questions/' + i + '.png');
}
