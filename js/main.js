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
            "Правильный ответ": 1,
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
            "Место красоты и вдохновения":0,
            "Место свободы и любви":0,
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

var specials = {
    // вопрос с нуля — процент
    "1-3":function(){
        $('main').hide();
        $('.special-text').html('ХММ…<br>А ПОЧЕМУ БЫ<br>И НЕТ?..');
        $('.face').attr('src', 'img/faces/why-not.png');
        $('.special').show();
    },
    "6-0": function(){
        $('main').hide();
        $('.face').attr('src', 'img/faces/facepalm.png');
        $('.special-text').html('БОООЖЕ…<br>КАКИЕ МАСОНЫ?!..');
        $('.special').show();
    }
};

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

    $('.preloader').show();
    setTimeout(function(){
        $('.preloader').hide();
        $('.app').show();
    }, 2000);
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

        if(!isSpecial){
            $('body').css('background-image', 'url("./images/questions/'+(nextQuestion+1)+'.png")');
            $('main').fadeIn();
        }
    });


    question = nextQuestion;
});


function showResult(){
    $('main').hide();
    $('.results').show();
    $('.results__number').text(result);

    if(typeof VK !== 'undefined') {
        VK.api('wall.post', {
            message: 'Я на 00 Качканарец. А ты?\n\nУзнай в приложении',
            attachments: 'https://vk.com/app5753070_-46359936',
            v:'5.45'
        },function(data) {
            if (data.response) {
            // data.response is object
            }
        });
    }
}


// Прелоад
for (var i = 1; i <= test.length; i++) {
    $("<img />").attr("src", 'images/questions/' + i + '.png');
}
