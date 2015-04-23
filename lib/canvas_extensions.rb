module CanvasExtensions
  PLATFORM = 'canvas.instructure.com'
  PLACEMENTS = [
    {key: :account_navigation, name: 'Account Navigation'},
    {key: :assignment_menu, name: 'Assignment Menu', message: :content_item_selection},
    {key: :course_home_sub_navigation, name: 'Course Home Sub Navigation'},
    {key: :course_navigation, name: 'Course Navigation'},
    {key: :course_settings_sub_navigation, name: 'Course Settings Sub Navigation'},
    {key: :discussion_topic_menu, name: 'Discussion Menu', message: :content_item_selection},
    {key: :editor_button, name: 'Editor Button', message: :content_item_selection_request},
    {key: :file_menu, name: 'File Menu', message: :content_item_selection},
    {key: :global_navigation, name: 'Global Navigation'},
    {key: :homework_submission, name: 'Homework Submission', message: :content_item_selection_request},
    {key: :migration_selection, name: 'Migration Selection', message: :content_item_selection_request},
    {key: :module_menu, name: 'Module Menu', message: :content_item_selection},
    {key: :quiz_menu, name: 'Quiz Menu', message: :content_item_selection},
    {key: :user_navigation, name: 'User Navigation'},
    {key: :assignment_selection, name: 'Assignment Selection', message: :content_item_selection_request},
    {key: :link_selection, name: 'Link Selection', message: :content_item_selection_request},
    {key: :wiki_page_menu, name: 'Wiki Page Menu', message: :content_item_selection},
    {key: :tool_configuration, name: 'Tool Configuration'}
  ]
end