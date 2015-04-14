require 'ims/lti'
class GuideController < ApplicationController
  def home
  end

  def xml_builder
    @placements = [
      {key: :account_navigation, name: 'Account Navigation'},
      {key: :assignment_menu, name: 'Assignment Menu', message: :content_item_selection},
      {key: :course_home_sub_navigation, name: 'Course Home Sub Navigation'},
      {key: :course_navigation, name: 'Course Navigation'},
      {key: :course_settings_sub_navigation, name: 'Course Settings Sub Navigation'},
      {key: :discussion_menu, name: 'Discussion Menu', message: :content_item_selection},
      {key: :editor_button, name: 'Discussion Menu', message: :content_item_selection},
      {key: :file_menu, name: 'File Menu', message: :content_item_selection},
      {key: :global_navigation, name: 'Global Navigation'},
      {key: :homework_submission, name: 'HomeWork Submission', message: :content_item_selection},
      {key: :migration_selection, name: 'Migration Selection'},
      {key: :module_menu, name: 'Module Menu'},
      {key: :quiz_menu, name: 'Quiz Menu'},
      {key: :resource_selection, name: 'Resource Selection'},
      {key: :user_navigation, name: 'User Navigation'}
    ]
  end

  def xml_config
    navigation_params = {:url => blti_launch_url}
    tc = IMS::LTI::Services::ToolConfig.new(:title => "Example Tool Provider", :launch_url => blti_launch_url)
    tc.description = "This is a Sample Tool Provider."

    if query_params = request.query_parameters
      platform = 'canvas.instructure.com'
      tc.set_ext_param(platform, :selection_width, query_params[:selection_width])
      tc.set_ext_param(platform, :selection_height, query_params[:selection_height])
      query_params[:custom_params].each {|_,v| tc.set_custom_param(v[:name].to_sym, v[:value]) } if query_params[:custom_params]
      query_params[:placements].each { |k, _| tc.set_ext_param(platform, k.to_sym, navigation_params) } if query_params[:placements]
    end
    render xml: tc.to_xml(:indent => 2)
  end

end
