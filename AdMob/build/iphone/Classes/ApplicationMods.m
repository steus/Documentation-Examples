#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"admob",@"name",@"ti.admob",@"moduleid",@"1.0",@"version",@"0d005e93-9980-4739-9e41-fd1129c8ff32",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
