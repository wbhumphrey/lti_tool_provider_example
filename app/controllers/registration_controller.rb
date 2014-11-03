class RegistrationController < ApplicationController
  include RailsLti2Provider::ControllerHelpers

  before_filter :registration_request, only: :register
  protect_from_forgery except: :save_capabilities
  after_filter :disable_xframe_header

  def register
    tool_setting_service = %w(LtiLink.custom.url ToolProxyBinding.custom.url ToolProxy.custom.url)
    filter_out = %w( basic-lti-launch-request ) + tool_setting_service
    tcp = @registration.tool_consumer_profile
    @capabilities = tcp.capability_offered.each_with_object({placements: [], parameters: []}) do |cap, hash|
      unless filter_out.include? cap
        if cap =~ /Canvas\.placements\.(.*$)/
          hash[:placements] << $1
        else
          hash[:parameters] << cap
        end
      end
    end

  end

  def save_capabilities
    registration = RailsLti2Provider::Registration.find(params["reg_id"])
    parameters = params['variable_parameters'].select { |_, v| v['enabled'] }
    placements = params['placements'].select { |_, v| v['enabled'] }
    tool_proxy = registration.tool_proxy
    tool_proxy.tool_profile
    tool_proxy
    rh = tool_proxy.tool_profile.resource_handler.first
    mh = rh.message.first
    mh.parameter = parameters.map { |var, val| IMS::LTI::Models::Parameter.new(name: val['name'], variable: var) }
    rh.ext_placements = placements.keys
    registration.update(tool_proxy_json: tool_proxy.to_json)

    redirect_to(rails_lti2_provider.submit_proxy_path(registration.id))
  end
end
