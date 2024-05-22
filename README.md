- Приложение может обслуживать url вида "/path" и "/path/id"
    - Реализованы обработчики для "/users" и "/users/id"

- Добавление обработчиков
        
        // controller/routes/routes.mjs
        addRoute('goods', goodsRoute)
        
        // теперь при обращении к /goods будут вызываться обработчики привязанные к goodsRoute

        // объект Route cодержит обработчики url-а для конкретных http-методов
        const goodsRoute = new Route();

        // добавляем обработчик POST
        goodsRoute.addAction('POST', ({data}) => { 
            goods.addGood(data);
        });

        // обработчик url с id назовем DynamicAction, его добавляем чуть по-другому

        // добавляем обработчик PUT для url с ID
        goodsRoute.addDynamicAction('PUT', ({id, data}) => {
            const good = goods.find(id);
            good.update(data);
        });

        // колбек в addAction и addDynamicAction содержит непосредственные инструкции обработчика
        // у коллбека один аргумент - объект в котором могут быть id или data
        // id всегда будет передан для DynamicAction (обработчика url с id)
        // data будет браться из реквеста, если обработчик ее ждет (POST и PUT ждут)

- Проверка
    - Можно запустить bash-скрипт `test.sh`. Необходим curl
