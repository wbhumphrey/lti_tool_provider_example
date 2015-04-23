class LaunchController < ApplicationController
  include RailsLti2Provider::ControllerHelpers
  skip_before_filter :verify_authenticity_token
  before_filter :lti2_authentication
  after_filter :disable_xframe_header

  def default

  end

end