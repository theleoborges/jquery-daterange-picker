require 'rubygems'
require 'closure-compiler'

VERSION="0.1.0"

task :default => :compile

desc "Creates a minified version and copies both that and the dev one into the dist directory"
task :compile do
  min = File.new("dist/jquery-daterange-picker-#{VERSION}.min.js", 'w+')
  min.write Closure::Compiler.new.compile(File.open('src/jquery-daterange-picker.js'))
  min.close
  FileUtils.cp 'src/jquery-daterange-picker.js', "dist/jquery-daterange-picker-#{VERSION}.js"
end