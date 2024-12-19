@{
    IncludeRules = @('*')
    ExcludeRules = @(
        'PSAvoidUsingCmdletAliases',
        'PSAvoidTrailingWhitespace',
        'PSUseConsistentIndentation',
        'PSUseConsistentWhitespace',
        'PSAvoidSemicolonsAsLineTerminators',
        'PSAvoidUsingPositionalParameters'
    )
    Rules = @{
        PSAvoidUsingCmdletAliases = @{
            Enable = $false
        }
    }
}