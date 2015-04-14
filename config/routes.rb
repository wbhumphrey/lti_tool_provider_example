LtiToolProvider::Application.routes.draw do
  root to: 'guide#home'

  get 'xml_config', to: 'guide#xml_config', as: :xml_config
  get 'xml_builder', to: 'guide#xml_builder', as: :xml_builder

  resources :tool_proxy, only: [:create]

  post 'messages/blti', to: 'message#basic_lti_launch_request', as: 'blti_launch'

  post 'register', to: 'registration#register', as: :tool_registration
  post 'submit_capabilities', to: 'registration#save_capabilities', as: 'save_capabilities'

  mount RailsLti2Provider::Engine => "/rails_lti2_provider"

end
