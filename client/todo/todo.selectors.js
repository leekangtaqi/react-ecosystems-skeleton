import { createSelector } from 'reselect';

const getTodos = state => state.todos;

const getVisibleFilter = state => state.visibilityFilter;

export const getVisibleTodos = createSelector(
	[getTodos, getVisibleFilter],
	(todos, visibilityFilter) => {
		switch (visibilityFilter) {
			case 'SHOW_ALL':
				return todos;
			case 'SHOW_DONE':
				return todos.filter(t => t.get('isDone'));
			case 'SHOW_TODOS':
				return todos.filter(t => !t.get('isDone'));
		}
	}
)