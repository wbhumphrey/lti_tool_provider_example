class MessageController < ApplicationController
  skip_before_action :verify_authenticity_token

  def basic_lti_launch_request
    @lti_params = params.except :action, :controller
  end

end