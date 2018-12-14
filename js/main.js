$(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };
    window.template = function(id) {
        return _.template($('#' + id).html());
    };
    App.Models.Task = Backbone.Model.extend({});
    App.Views.Task = Backbone.View.extend({
        tagnName: 'li',
        template: template('taskTemplate'),
        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        },
        events: {
            'click .edit': 'editTask'
        },
        editTask: function() {
            var newTaskTitle = prompt('как назовем задачу?', this.model.get('title'));
            this.model.set('title', newTaskTitle);
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