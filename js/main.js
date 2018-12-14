$(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };
    window.template = function(id) {
        return _.template($('#' + id).html());
    };
    App.Models.Task = Backbone.Model.extend({
        validate: function(attrs) {
            if (! $.trim(attrs.title)) {
                return 'Имя задачи должно быть валидным!';
            }
        }
    });
    App.Views.Task = Backbone.View.extend({
        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagnName: 'li',
        template: template('taskTemplate'),
        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        },
        remove: function() {
            this.$el.remove();
        },
        events: {
            'click .edit': 'editTask',
            'click .delete': 'destroy'
        },
        editTask: function() {
            var newTaskTitle = prompt('как назовем задачу?', this.model.get('title'));
            this.model.set('title', newTaskTitle);
        },
        destroy: function() {
            this.model.destroy();
        }
    });
    App.Collections.Task = Backbone.Collection.extend({
        model: App.Models.Task
    })
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(task) {
            var taskView = new App.Views.Task({model: task});
            this.$el.append(taskView.render().el)
        }
    })

    var tasksCollection = new App.Collections.Task([
        {
            title: 'Сходить в магазин',
            priority: 4
        },
        {
            title: 'Получить почту',
            priority: 3
        },
        {
            title: 'Сходить на работу',
            priority: 5
        }
    ]);
    
    var taskView = new App.Views.Tasks({collection: tasksCollection});

    $('.tasks').html(taskView.render().el);

})